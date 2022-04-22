class GreedKnapsack {
    execute(totalSpace, stars) {
        const sortedStars = stars.sort((a, b) => this.key(b) - this.key(a));
        const bestStars = [];
        let spaceSack = totalSpace;
        let i = 0;
        let score = 0;

        while (spaceSack > 0 && i < sortedStars.length) {
            if (spaceSack >= sortedStars[i].weight) {
                score += sortedStars[i].value;
                spaceSack -= sortedStars[i].weight;
                bestStars.push(sortedStars[i]);
            }
            i++;
        }

        return [score, bestStars];
    }

    key(star) {
        return star.value / star.weight
    }
}