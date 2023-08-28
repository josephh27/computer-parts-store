import Button from "../forms/Button";

const LoadMore = ({
    onLoadMoreEvent = () => { },
}) => {
    return (
        <Button onClick={() => onLoadMoreEvent()}>
            Load More
        </Button>
    );
};

export default LoadMore;