export const swimLaneColor = (type) => {
    switch (type) {
        case 'available':
            return 'green';
        case 'low':
            return 'yellow';
        case 'out':
            return 'red';
        default:
            return 'green';
    }
}

export const swimLaneTitle = (type) => {
    switch (type) {
        case 'available':
            return 'Available';
        case 'low':
            return 'Running Low';
        case 'out':
            return 'Out of Stock';
        default:
            return 'Available';
    }
}