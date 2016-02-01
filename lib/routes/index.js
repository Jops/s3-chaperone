function setup( app, handlers )
{
    var routeSet;
    for( var accessor in handlers )
    {
        for( var route in handlers[accessor] )
        {
            routeSet = handlers[accessor][route];
            app[routeSet.method](
                routeSet.path,
                routeSet.callback
            );
        }
    }
}

module.exports.setup = setup;
