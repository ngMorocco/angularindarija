import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SearchService } from '@core/services/search.service';
import { InputComponent } from '@shared/components/input/input.component';

export interface SearchHit {
  objectID: string;
  title: string;
  start: string;
  end: string;
  tags: string[];
  session: {
    videoId: string;
    title: string;
    subtitle: string;
    tags: string[];
    category: string;
  };
}

@Component({
  selector: 'app-search-widget',
  template: `
    <app-input [value]="query" [delay]="200" (query)="onQuery($event)"/>
    <ng-container *ngIf="query && results">
      <div class="drop-down">
        <ng-template #noResults> No results. </ng-template>
        <ng-container *ngIf="results.size; else noResults">
          <table>
            <tr *ngFor="let result of results | keyvalue">
              <td class="title">
                <h3>{{ result.key }}</h3>
              </td>
              <td>
                <div
                  class="hit"
                  *ngFor="let hit of result.value"
                  (click)="onSearchHit(hit)"
                >
                  {{ hit.title }}
                </div>
              </td>
            </tr>
          </table>
        </ng-container>
        <div class="algolia">
          <img src="/assets/algolia.svg" alt="Search by Algilia" />
        </div>
      </div>
    </ng-container> `,
  styles: [
    `
      .drop-down {
        position: absolute;
        margin-top: 5px;
        padding: 12px;
        border-radius: 5px;
        color: var(--body-color);
        border: 0;
        transition: background 0.3s, box-shadow 0.3s;
        background-color: var(--bg-transparent);
        opacity: 1;
      }

      .drop-down:before {
        content: '';
        background-color: transparent;
        border-right: 8px solid transparent;
        position: absolute;
        border-left: 8px solid transparent;
        border-bottom: 8px solid var(--bg-transparent);
        border-top: 8px solid transparent;
        top: -15px;
        right: 18px;
      }

      .title {
        h3 {
          padding: 5px 5px;
          margin: 0;
          margin-right: 15px;
        }
        vertical-align: top;
      }

      .hit {
        padding: 5px 5px;
        cursor: pointer;
      }

      .ais-Highlight-highlighted {
        color: var(--primary-color) !important;
      }

      .algolia {
        margin-top: 10px;
        text-align: right;
        img {
          height: 20px;
        }
      }
    `
  ],
  standalone: true,
  imports: [InputComponent, CommonModule]
})
export class SearchWidgetComponent {
  @Output() searchHit = new EventEmitter<SearchHit>();

  searchService = inject(SearchService);
  results!: Map<string, SearchHit[]>;
  query = '';

  async onQuery(query: string) {
    this.query = query;
    const results = await this.searchService.search<SearchHit>(query);
    this.results = (results?.hits || []).reduce(
      (grouped: Map<string, SearchHit[]>, hit) => {
        const titles = grouped.get(hit.session.title) || [];
        if (!titles.length) {
          grouped.set(hit.session.title, titles);
        }
        titles.push(hit);
        return grouped;
      },
      new Map<string, SearchHit[]>()
    );
  }

  onSearchHit(hit: SearchHit) {
    this.query = '';
    this.searchHit.emit(hit);
  }
}
