import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datecstm',
  standalone: true,
})
export class DatecstmPipe implements PipeTransform {
  transform(timestamp: any): string {
    /*const now = new Date();
    const targetDate = new Date(timestamp);
    const diffInMs = now.getTime() - targetDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) {
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        if (diffInHours <= 1) {
            return '1h ago';
        }
        return `${diffInHours}h ago`;
    } else if (diffInDays <= 7) {
        if (diffInDays === 1) {
            return '1 day ago';
        }
        return `${diffInDays} days ago`;
    } else if (diffInDays <= 30) {
        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks === 1) {
            return '1 week ago';
        }
        return `${diffInWeeks} weeks ago`;
    } else if (diffInDays <= 365) {
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths === 1) {
            return '1 month ago';
        }
        return `${diffInMonths} months ago`;
    } else {
        return targetDate.toLocaleDateString('en-GB');
    }*/

    const now = new Date();
    const targetDate = new Date(timestamp);
    const diffInMs = now.getTime() - targetDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000); // Convert milliseconds to seconds

    if (diffInSeconds <= 0) {
      return 'just now';
    } else if (diffInSeconds < 60) {
        if(diffInSeconds === 1) {
            return `${diffInSeconds} second ago`;      
        }
      return `${diffInSeconds} seconds ago`;
    } else {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) {
        if(diffInMinutes === 1) {
            return `${diffInMinutes} minute ago`;
        }
        return `${diffInMinutes} minutes ago`;
      } else {
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            if(diffInHours === 1) {
                return `${diffInHours} hour ago`;
            }
          return `${diffInHours} hours ago`;
        } else {
          const diffInDays = Math.floor(diffInHours / 24);
          if (diffInDays < 7) {
            if(diffInDays === 1) {
                return `${diffInDays} day ago`;
            }
            return `${diffInDays} days ago`;
          } else {
            const diffInWeeks = Math.floor(diffInDays / 7);
            if (diffInWeeks < 4) {
                if(diffInWeeks === 1)
              return `${diffInWeeks} weeks ago`;
            } else {
              const diffInMonths = Math.floor(diffInDays / 30);
              if (diffInMonths < 12) {
                if(diffInMonths === 1) {
                    return `${diffInMonths} month ago`; 
                }
                return `${diffInMonths} months ago`;
              } else {
                return targetDate.toLocaleDateString('en-GB');
              }
            }
          }
        }
        return `over 1 year ago`;
      }
      
    }
  }
}
