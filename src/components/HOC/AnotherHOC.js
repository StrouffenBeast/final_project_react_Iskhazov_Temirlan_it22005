import React from 'react';

const AnotherHOC = (WrappedComponent) => {
    class EnhancedComponent extends React.Component {
        state = {
            isLoading: true,
        };

        componentDidMount() {
            setTimeout(() => {
                this.setState({ isLoading: false });
            }, 2000);
        }

        render() {
            const { isLoading } = this.state;

            if (isLoading) {
                return <div>Loading...</div>;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    return EnhancedComponent;
};

export default AnotherHOC;
