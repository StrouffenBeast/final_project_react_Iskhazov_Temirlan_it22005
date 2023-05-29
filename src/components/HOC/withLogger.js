import React, { useEffect } from 'react';

const withLogger = (WrappedComponent) => {
    const WithLogger = (props) => {
        useEffect(() => {
            console.log('Component is mounted:', WrappedComponent.name);

            return () => {
                console.log('Component is unmounted:', WrappedComponent.name);
            };
        }, []);

        return <WrappedComponent {...props} />;
    };

    return WithLogger;
};

export default withLogger;
