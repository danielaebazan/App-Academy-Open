function paginate(req) {
    //console.log('doing pagination');

    let page = req.query.page ? parseInt(req.query.page): null
    let size = req.query.size ? parseInt(req.query.size): null   

    if (isNaN(page) || isNaN(size) || page < 0 || size < 0) {
        err.paginationError = 'Requires valid page and size params';
        next(err);
        return
    }
   

    //  Special case to return all students (page=0, size=0)
    if (page === 0) page = 1;
    if (size === 0) size = 200;       

    req.limit = size;
    req.offset =  req.offset ? size * (page - 1): null;   
}
exports.paginate = paginate