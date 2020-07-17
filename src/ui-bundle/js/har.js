Split(['#one', '#two'], {
    sizes: [25, 75],
    minSize: 100,
    elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
    }),
    gutterStyle: (dimension, gutterSize) => ({
        'flex-basis': `${gutterSize}px`,
    }),
})
