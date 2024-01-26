const turf = require('@turf/turf');

// Tọa độ của 4 góc hội trường T45
const polygonCoords = turf.polygon([
    [105.82506591622553, 21.00752741126261],
    [105.82538979294438, 21.00737404538046],
    [105.82496399228916, 21.00734086825052],
    [105.82528786900801, 21.00718061634922]
]);

// Kiểm tra hướng của các điểm và sắp xếp chúng theo chiều kim đồng hồ nếu cần
if (!turf.booleanClockwise(polygonCoords)) {
    polygonCoords.reverse();
}

// Tạo đa giác từ các điểm góc
// const polygon = turf.polygon([polygonCoords]);

// Tọa độ của điểm cần kiểm tra
const testPointCoords =  turf.polygon([105.8252, 21.0073]);

// Tạo điểm từ tọa độ

// Kiểm tra xem điểm có nằm trong đa giác không
const isPointInside = turf.booleanPointInPolygon(testPoint, testPointCoords);

if (isPointInside) {
    console.log("Điểm nằm trong khu vực hội trường T45.");
} else {
    console.log("Điểm không nằm trong khu vực hội trường T45.");
}
