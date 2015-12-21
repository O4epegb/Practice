var component = require('./component');
require('./main.styl');

var app = document.createElement('div');


document.body.appendChild(app);

app.appendChild(component());
