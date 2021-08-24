import {Component, Input, OnInit} from '@angular/core';
import {NotificationService} from 'src/app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
    @Input() message!: string;
    @Input() isError!: boolean;
    @Input() show!: boolean;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {}

    onClose() {
        this.notificationService.undoNotification();
    }
}
