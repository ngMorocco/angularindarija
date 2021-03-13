import {Component, Input, ViewEncapsulation} from '@angular/core';
import {YtVideoItem} from 'src/app/_core/models/models';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoItemComponent {

  @Input() ytVideo: YtVideoItem | null = null;

}
