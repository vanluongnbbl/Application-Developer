module.exports = (req, res) => {
    let cookies = req.cookies
    if (cookies) {
        res.clearCookie("token");
    }
    res.redirect('/')
}