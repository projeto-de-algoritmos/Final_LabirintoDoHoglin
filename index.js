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
    
        return [m[stars.length][totalSpace].value, this.listBestStars(m, stars, totalSpace)];
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

function main(){
    function createItem(id, value, weight){
        return {
            id,
            value, 
            weight,
        };
    }

    const items = [
        createItem('1', 1, 1),
        createItem('2', 6, 2),
        createItem('3', 18, 5),
        createItem('4', 22, 6),
        createItem('5', 26, 7),
    ]

    const W = 11;
    console.log(items)
    console.log(new PDKnapsack().execute(W, items));
}

main()