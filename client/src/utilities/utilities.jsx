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

export const canUpdateInventory = (role) => {
    switch (role) {
        case 1:
            return true;
        case 2:
            return true;
        case 3:
            return true;
        case 4:
            return false;
        default:
            return false;
    }
}

export const canOrderBulk = (role) => {
    switch (role) {
        case 1:
            return true;
        case 2:
            return true;
        case 3:
            return false;
        case 4:
            return false;
        default:
            return false;
    }
}