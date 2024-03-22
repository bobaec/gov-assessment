module.exports = async (req, res, next) => {
    try {
        console.log('authorized check');
        next();
    } catch (error) {
        console.log(error.message);
    }
};