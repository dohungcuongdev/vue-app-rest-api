export const firstMissingPositive = function(nums) {
    var swap = function(i, j) {
        var tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    };

    for (let i = 0; i < nums.length; i++) {
        while (0 < nums[i] && nums[i] - 1 < nums.length
                && nums[i] != i + 1
                && nums[i] != nums[nums[i] - 1]) {
            swap(i, nums[i] - 1);
        }
    }

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] != i + 1) {
            return i + 1;
        }
    }
    return nums.length + 1;
};


export const firstMissingID = function(objs) {
    let nums = []
    for (let i = 0; i < objs.length; i++) {
        nums[i] = objs[i].id;
    }
    return firstMissingPositive(nums);
};

export const isArray = function (value) {
    return !hasNoValue() && (value && typeof value === 'object' && value.constructor === Array);
}

export const isObject = function (value) {
    return !hasNoValue() && (value && typeof value === 'object' && value.constructor === Object);
}

export const isArrayOrObject = function (value) {
    return isArray(value) || isObject(value);
}

// Returns if a value is null
export const isNull = function (value) {
    return value === null;
}
    
// Returns if a value is undefined
export const isUndefined = function (value) {
    return typeof value === 'undefined';
}

export const hasNoValue = function (value) {
    return isNull(value) || isUndefined(value);
}