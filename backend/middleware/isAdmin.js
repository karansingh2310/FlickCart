const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Not an admin" });
    }
    next();
};

export default isAdmin;