import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ColumnScoreService } from 'src/collection/columnScore/columnScore.service';
import { QuestionService } from 'src/collection/question/question.service';
import { ScoreType } from 'src/type/ScoreType';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: any;
  private logger: Logger = new Logger('MessageGateway');
  private onlines = {};
  constructor(
    private columnScoreService: ColumnScoreService,
    private questionService: QuestionService,
  ) {}
  afterInit(server) {
    this.logger.log(server, 'App gateway initialized');
  }

  handleConnection(client) {
    this.logger.log('new client conntected:' + client.id);
    client.emit('connected', 'Successfully connected to the server');
  }

  handleDisconnect(client: any) {
    delete this.onlines[client.id];
    client.emit('disconnected', 'asdsa');
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.in(data.room).emit('receive_message', data);
  }

  @SubscribeMessage('join_class')
  async handleJoinClass(
    @MessageBody() data: { classId: string; userId: string },
    @ConnectedSocket() client: any,
  ) {
    this.onlines[client.id] = data.userId;
    await client.join(data.classId);

    const clientsInRoom = this.server.in(data.classId)?.adapter.rooms;

    const listStudent = [];
    clientsInRoom.get(data.classId).forEach((student) => {
      listStudent.push(this.onlines[student]);
    });

    console.log('listStudent', listStudent);
    client
      .to(data.classId)
      .emit('receive_students-online-in-class', listStudent);
  }

  @SubscribeMessage('leave_class')
  async handleLeaveClass(
    @MessageBody() classId: string,
    @ConnectedSocket() client: Socket,
  ) {
    delete this.onlines[client.id];
    console.log('leave', classId);
    client.leave(classId);
  }

  @SubscribeMessage('add_badge')
  async handleAddBadge(
    @MessageBody() req: any,
    @ConnectedSocket() client: Socket,
  ) {
    const res = await this.columnScoreService.addBadge(
      req.data.badge,
      req.data.id,
    );

    const message =
      res.type === ScoreType.MINUS ? 'bị trừ 1 điểm' : 'được cộng 1 điểm';
    client.nsp.in(req.room).emit('receive_badge', {
      message: `${
        req.data.username
      } ${message} vì ${res.name.toLocaleLowerCase()}`,
      type: res.type,
    });
  }

  @SubscribeMessage('add_question')
  async handleAddQuestion(
    @MessageBody() data: { classRoom: string; questionIds: string[] },
    @ConnectedSocket() client: Socket,
  ) {
    const listQuestion = await this.questionService.findQuestionByListId(
      data.questionIds,
    );

    client.to(data.classRoom).emit('receive_quick-test', listQuestion);
  }
}
