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
import { ScoreType } from 'src/type/ScoreType';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MessageGateway');
  constructor(private columnScoreService: ColumnScoreService) {}
  afterInit(server) {
    this.logger.log(server, 'App gateway initialized');
  }

  handleConnection(client) {
    this.logger.log('new client conntected:' + client.id);
    client.emit('connected', 'Successfully connected to the server');
  }

  handleDisconnect(client: any) {
    client.emit('disconnected', 'asdsa');
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    client.to(data.room).emit('receive_message', data);
  }

  @SubscribeMessage('join_class')
  async handleJoinClass(
    @MessageBody() classId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(classId);
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
    client.to(req.room).emit('receive_badge', {
      message: `${req.data.username} ${message}`,
      type: res.type,
    });
  }
}
