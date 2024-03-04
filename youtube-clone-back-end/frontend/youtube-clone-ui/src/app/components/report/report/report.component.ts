import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RadioGroupComponent } from '../../radio-group/radio-group.component';
import { ReportTypeInterface } from '../../../shared/types/reportType.interface';
import { ReportService } from '../../../shared/services/report/report.service';
import { FormsModule } from '@angular/forms';
import { ReportFormInterface } from '../types/reportForm.interface';
import { normalizeSelection } from '../../../shared/utils/sharedUtils';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, RadioGroupComponent, NgIf, FormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent {
  selection: ReportTypeInterface[];
  selectedIssue: ReportTypeInterface;
  reportDescription: string;
  reportForm: ReportFormInterface = {
    userId: 0,
    videoId: 0,
    commentId: 0,
    reportTypeId: 0,
    type: 'VIDEO', //('VIDEO', 'COMMENT')
    description: undefined,
  };

  @Input() step: number = 0;
  @Output() onSelectedType: EventEmitter<ReportTypeInterface> =
    new EventEmitter<ReportTypeInterface>();

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.getReportTypes();
  }

  /**
   * on radio button selection
   * @param event
   */
  onRadioBtnClicked(event: ReportTypeInterface) {
    this.selectedIssue = event;
    this.onSelectedType.emit(event);
  }

  /**
   * process the report types for display
   */
  getReportTypes() {
    this.reportService.getAllReportTypes().subscribe({
      next: (response) => {
        this.selection = response.data['types'];
        this.selection = this.processSelection(this.selection);
      },
    });
  }

  /**
   * reformat the selection
   * @param  data the data
   */
  processSelection(data: any): any {
    if (data) {
      data.forEach((item: any) => {
        if (item.type) {
          item.type = normalizeSelection(item?.type);
        }
      });
    }
    return data;
  }

  /**
   * write report to database
   */
  sendReport() {
    console.log('WRITE REPORT TO DB');
  }

  /**
   * lifecycle hook
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.step) {
      changes.step.currentValue === 2 ? undefined : this.sendReport();
    }
  }
}
