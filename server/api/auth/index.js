const router = require('express').Router();
const {userService} = require('../../services');

module.exports = router;

router.post('/login', async (req, res, next) => {
    try {
        const user = await userService.login(req.body);
        req.login(user, e => (e ? next(e) : res.json(user)));
    } catch (e) {
        res.status(e.status).send(e.statusText);
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const user = await userService.signup(req.body);
        req.login(user, e => (e ? next(e) : res.json(user)));
    } catch (e) {
        res.status(e.status).send(e.statusText);
    }
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/me', (req, res) => {
    res.json(req.user);
});

router.use('/google', require('./google'));
