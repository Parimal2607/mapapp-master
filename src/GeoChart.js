import React, { useState } from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import { scaleQuantize } from "d3-scale";
import countries from "./world_countries.json";
import optionValue from './selectData.json'
import Select from "react-select";
import { Row, Col, Card, CardBody } from "reactstrap";
const countriesData = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
];

const GeoChart = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const countryOptions = optionValue?.map((country) => ({
    value: country?.value,
    label: country?.id,
  }));
  console.log(selectedCountry)
  // Handle country selection
  const handleCountrySelect = (selectedOption) => {
    setSelectedCountry([{ id: selectedOption.label, value: selectedOption.value }]);
  };
  const getColor = scaleQuantize().domain([1]).range(["#ededed", "blue"]);
  return (
    <div>
      <Row className="justify-content-end">
        <Col lg="4">
          <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={handleCountrySelect}
            placeholder="Select a country"
          />
        </Col>
        <Card className="mt-3">
          <CardBody>
            <div style={{ height: "500px" }}>
              <ResponsiveChoropleth
                data={selectedCountry}
                features={countries.features}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                colors={getColor}
                domain={[0, 1]}
                unknownColor="#ededed"
                valueFormat=".2s"
                projectionScale={130}
                projectionTranslation={[0.5, 0.5]}
                projectionRotation={[0, 0, 0]}
                enableGraticule={true}
                graticuleLineColor="#ffffff"
                borderWidth={0.5}
                borderColor={{ theme: "background" }}
                tooltip={(data, color) => (
                  <div
                    style={{
                      padding: 12,
                      color,
                      background: "#ffffff",
                    }}
                  >
                    <span>Look, I'm custom :</span>
                    <br />
                    <strong>
                      <span>{data.feature.properties.name}</span>
                    </strong>
                    <br />
                    <strong>
                      {data.feature.id}: {data.feature.value}
                    </strong>
                  </div>
                )}
              />
            </div>
          </CardBody>
        </Card>
      </Row>
    </div>
  );
};

export default GeoChart;
