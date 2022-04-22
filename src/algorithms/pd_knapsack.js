class PDKnapsack {
    execute (totalSpace, stars) {
        const m = [new Array(totalSpace + 1),];
        m[0].fill(this.createNode(0, false));
    
        for (let i = 1; i <= stars.length; i++) {
            m[i] = new Array(totalSpace + 1);
            m[i][0] = this.createNode(0, false);
    
            for (let w = 1; w <= totalSpace; w++) {
                m[i][w] = this.select(m, stars[i - 1], i, w);
            }
        }
    
        const bestValue = m[stars.length][totalSpace].value;
        const bestStars = this.listBestStars(m, stars, totalSpace)
        return [bestValue, bestStars];
    }

    createNode(value, take){
        return {
            value,
            take
        }
    }

    select(m, star, i, w){
        if (star.weight > w) {
            return this.createNode(m[i - 1][w].value, false);
        }
    
        const take = star.value + m[i - 1][w - star.weight].value;
        const dontTake = m[i - 1][w].value;
    
        if (take >= dontTake) {
            return this.createNode(take, true);
        }
        return this.createNode(dontTake, false);
    }

    listBestStars(m, stars, weight){
        const bestStars = [];
        let w = weight;
    
        for (let i = stars.length; i > 0 && w > 0; i--) {
            const node = m[i][w];
    
            if (node.take) {
                const star = stars[i-1];
                
                w = w - star.weight;
                bestStars.push(star);
            }
        }
        return bestStars;
    }
}