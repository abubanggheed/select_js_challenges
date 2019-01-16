const leapyear = year => (
    !(year % 400) || (year % 100 !== 0 && !(year % 4))
)
