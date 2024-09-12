const levelData = {
    1: {
        level: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        hardBulletInterval: {
            min: 20,
            max: 40
        },
        time: 30
    },
    2: {
        level: [
            [1],
            [1],
            [1],
            [1],
            [1,1],
            [1],
            [1],
            [1],
            [1],
            [1,1],
            [1]
        ],
        hardBulletInterval: {
            min: 15,
            max: 35
        },
        time: 40
    },
    3: {
        level: [
            [1,1],
            [1,11],
            [1,1,2],
            [1,1,2],
            [1,1,2],
            [1,1],
            [1,1],
            [1,1],
            [1,1],
            [1,1,1],
            [1,1]
        ],
        hardBulletInterval: {
            min: 5,
            max: 10 
        },
        time: 40 
    },
    4: {
        level: [
            [1,1,1],
            [1,1],
            [1,1,1],
            [1,1,1],
            [1,1,1],
            [1,1,2,1],
            [1,2],
            [1,1,1,1],
            [1,1,2],
            [1,2,1],
            [1,2,1]
        ],
        hardBulletInterval: {
            min: 10,
            max: 15
        },
        chanceOfHardBlock: .97,
        time: 40
    },
    5: {
        level: [
            [1,1,1,1],
            [1,1,1],
            [1,1,2],
            [1,1,1,2],
            [1,1,2],
            [1,1,2],
            [1,2],
            [1,1,2,1],
            [1,1,2],
            [1,2,1],
            [1,2,1]
        ],
        hardBulletInterval: {
            min: 7,
            max: 12
        },
        chanceOfHardBlock: .95,
        time: 40
    },
    6: {
        level: [
            [1,1,1,1,1],
            [1,1,1,3],
            [1,1,2],
            [1,1,1,2,1,1,1],
            [1,1,2,1,3],
            [1,1,1],
            [1,1,1],
            [1,1,3],
            [1,1,1,1,1,1,1],
            [1,2,1,3],
            [1,2,1,1]
        ],
        hardBulletInterval: {
            min: 5,
            max: 10
        },
        fallingTimer: 10,
        chanceOfHardBlock: .95,
        time: 40
    },
    7: {
        level: [
            [1,1,1],
            [1,1,1],
            [1,1,2,3],
            [1,1,1,2,2],
            [1,1,3],
            [1,1,1,3],
            [1,1,2],
            [1,1,2],
            [1,1,1,3],
            [1,2,1],
            [1,2,1,1,1]
        ],
        hardBulletInterval: {
            min: 5,
            max: 10
        },
        fallingTimer: 7,
        chanceOfHardBlock: .9,
        time: 40
    },
    8: {
        level: [
            [1,1,3],
            [1,1,1,3],
            [1,1,2,2,3],
            [1,1,1,2,1,3],
            [1,1,3],
            [1,1,1,3],
            [1,1,2],
            [1,1,2],
            [1,1,1,1,3],
            [1,2,1,3],
            [1,2,3]
        ],
        hardBulletInterval: {
            min: 5,
            max: 10
        },
        fallingTimer: 7,
        chanceOfHardBlock: .95,
        time: 40
    },
    9: {
        level: [
            [1,1,1,1,3],
            [1,1,1,1,3],
            [1,1,1,2,3],
            [1,1,1,2,3],
            [1,1,2,1,3],
            [1,1,1,1,3],
            [1,1,2,1,3],
            [1,1,2,1,3],
            [1,1,1,1,3],
            [1,2,1,1,3],
            [1,2,1,1,3]
        ],
        hardBulletInterval: {
            min: 5,
            max: 8
        },
        fallingTimer: 5,
        chanceOfHardBlock: .80,
        time: 45
    },
    10: {
        level: [
            [1,1,1,1,1,3],
            [1,1,1],
            [1,1,2,2,1,3],
            [1,1,1,2],
            [1,1,1,1,1,1,3],
            [1,1,1,],
            [1,1,2,1,1,3],
            [1,1,2],
            [1,1,1,1,1,3],
            [1,2,1],
            [1,2,1,1,1,3]
        ],
        hardBulletInterval: {
            min: 2,
            max: 4
        },
        fallingTimer: 5,
        chanceOfHardBlock: .5,
        time: 50
    }
}