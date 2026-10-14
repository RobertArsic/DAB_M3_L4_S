module.exports = {
    checkIfAuthorized: function(req, res, next) {
        if(req.user == null) {
            res.status(401).send(new Error());
            return;
        }
        if(req.user.role == "Admin" || req.user.role == "User")
            next();
    },

    //Middleware to check if the user is an admin
    canSeeUserDetails: function(req, res, next) {
    if (req.user != null)
        if(req.user.role === "Admin" || req.user.id == req.params.userId) {
        next();
        return;
        }
    res.redirect('/login');
    }
}