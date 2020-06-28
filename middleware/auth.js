module.exports = {
  authenticator : (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '還沒有登錄喔！')
    res.redirect('/users/login')
  }
}