require('dotenv').config();
app.get('/api/some-route', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.BASE_URL);
    next();
}, (req, res) => {
    res.send('Some data');
});
