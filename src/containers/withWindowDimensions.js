import React, { useState, useEffect } from 'react';

function withWindowDimensions(WrappedComponent) {
    return function WindowDimensionsWrapper(props) {
        const [windowDimensions, setWindowDimensions] = useState({
            width: window.innerWidth,
            height: window.innerHeight
        });

        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        useEffect(() => {
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return (
            <WrappedComponent
                width={windowDimensions.width}
                height={windowDimensions.height}
                {...props}
            />
        );
    };
}

export default withWindowDimensions;
