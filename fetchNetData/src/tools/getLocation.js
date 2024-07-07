/**
 * 获取地理位置坐标
 * @param {number} interval 
 * @returns 
 */
function generatePoints(interval) {
  const points = [];

  for (let lat = -34; lat <= -10; lat += interval) {
    for (let lon = 110; lon <= 160; lon += interval) {
      points.push({ lat, lon });
    }
  }

  return points;
}

export const ParamsList = generatePoints(1);
// export const ParamsList = [{ lat: -35.2812211, lon: 149.1291486 }]

// 澳洲纬度范围：南纬10°41'-43°39'之间；经度范围：东经112°-154°之间。
// 南纬是负值，东经是正值
// latitude是纬度 longitude是经度