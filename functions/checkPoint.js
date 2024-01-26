
exports.checkPoint = (type, lat, long) => {
    // Tọa độ 4 điểm đo được 
    const point1 = [type.lat1, type.long1];
    const point2 = [type.lat2, type.long2];
    const point3 = [type.lat3, type.long3];
    const point4 = [type.lat4, type.long4];

    // Tọa độ cần kiểm tra
    const checkPoint = [lat, long];

    // Tính diện tích đa giác bằng công thức Shoelace
    function getArea(points) {
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            area += points[i][0] * points[j][1];
            area -= points[j][0] * points[i][1];
        }

        return Math.abs(area / 2);
    }

    // Tìm tọa độ tâm của đa giác 
    function getCentroid(points) {
        let x = 0;
        let y = 0;

        for (let i = 0; i < points.length; i++) {
            x += points[i][0];
            y += points[i][1];
        }

        return [x / points.length, y / points.length];
    }

    // Tọa độ các đỉnh đa giác
    const points = [point1, point2, point3, point4];

    // Tính diện tích và tâm đa giác
    const area = getArea(points);
    const centroid = getCentroid(points);

    // Tính khoảng cách từ tâm đến điểm cần kiểm tra 
    function getDistance(point1, point2) {
        return Math.hypot(point1[0] - point2[0], point1[1] - point2[1]);
    }

    const checkDist = getDistance(centroid, checkPoint);

    // So sánh khoảng cách với khoảng cách tối đa
    let maxDist = 0;
    for (let i = 0; i < points.length; i++) {
        const dist = getDistance(centroid, points[i]);
        if (dist > maxDist) {
            maxDist = dist;

        }

    }

    if (checkDist <= maxDist) {
       return true;
    } else {
      return false;
    }
}


module.exports = exports;
