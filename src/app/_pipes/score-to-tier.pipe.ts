import { OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'scoreToTier',
    pure: false
})
export class ScoreToTierPipe implements PipeTransform, OnDestroy {
    constructor(
    ) { }
    transform(value: string) {
        const num = Number(value);
        if (num >= 100) {
            return 'S';
        }
        if (num >= 90) {
            return 'A';
        }
        if (num >= 80) {
            return 'B';
        }
        if (num >= 70) {
            return 'C';
        }
        if (num >= 60) {
            return 'D';
        }
        if (num >= 50) {
            return 'E';
        }
        return 'F';
    }
    ngOnDestroy(): void {
    }
}
