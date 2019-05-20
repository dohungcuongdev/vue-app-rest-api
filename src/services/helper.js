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