var https = require('https');

exports.data = {
    body: "${body}"
}

var body = https.get('https://d17h27t6h515a5.cloudfront.net/topher/2017/May/59121517_baking/baking.json', response => {
    
    let body = "";
    let result = "";

    response.on('data', data => {
        //console.log(data.toString())
        body += data.toString();
        //console.log(body)
        return body

    });

    response.on('end', () => {

        const recipe = JSON.parse(body);
        recipe.forEach(function(recipe){
            result += recipe.name
            return result
        })
        
    });

});

console.log(body)