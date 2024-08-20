import { Socket } from 'socket.io-client';
import io from 'socket.io-client';

class ReactBridge {
    private socket: Socket;

    constructor(url: string) {
        this.socket = io(url);
        console.log("lan");
    }

    execute(command: string, args: any): Promise<any> {
        const resultEvent = `${command}-result`;
        const errorEvent = `${command}-error`;

        return new Promise((resolve, reject) => {
            this.socket.emit(command, args);

            this.socket.once(resultEvent, (data: any) => {
                resolve(data);
            });

            this.socket.once(errorEvent, (error: any) => {
                reject(error);
            });
        });
    }

    on(event: string, callback: (data: any) => void, done: () => void): void {
        this.socket.on(event, (data: any) => {
            callback(data);
        });
        const doneEvent = `${event}-done`;
        this.socket.once(doneEvent, () => {
            done();
            this.off(event);
        });
    }

    off(event: string): void {
        this.socket.off(event);
    }
}

export default ReactBridge;