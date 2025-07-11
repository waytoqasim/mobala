import PropTypes from "prop-types";
import React from "react";
import "../App.css";

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
]);

const propTypes = {
  labels: PropTypes.shape({
    left: {
      title: PropTypes.string.isRequired,
      value: valueType,
    },
    // center: {
    //   title: PropTypes.string.isRequired,
    //   value: valueType
    // },
    right: {
      title: PropTypes.string.isRequired,
      value: valueType,
    },
  }),
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

const defaultProps = {
  labels: {
    left: {
      title: "left",
      value: "left",
    },
    // center: {
    //   title: "center",
    //   value: "center"
    // },
    right: {
      title: "right",
      value: "right",
    },
  },
  onChange: (value) => console.log("value:", value),
};

class TripleToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPosition: "left",
      animation: null,
    };
  }

  getSwitchAnimation = (value) => {
    const { switchPosition } = this.state;
    //console.log("asdsa");
    let animation = null;
    if (value === "center" && switchPosition === "left") {
      animation = "left-to-center";
    } else if (value === "right" && switchPosition === "center") {
      animation = "center-to-right";
    } else if (value === "center" && switchPosition === "right") {
      animation = "right-to-center";
    } else if (value === "left" && switchPosition === "center") {
      animation = "center-to-left";
    } else if (value === "right" && switchPosition === "left") {
      animation = "left-to-right";
    } else if (value === "left" && switchPosition === "right") {
      animation = "right-to-left";
    }
    this.props.onChange(value);
    this.setState({ switchPosition: value, animation });
  };

  render() {
    const { labels } = this.props;

    return (
      <div className="main-container">
        <div
          className={`switch ${this.state.animation} ${this.state.switchPosition}-position`}
        ></div>
        <input
          defaultChecked
          onChange={(e) => this.getSwitchAnimation(e.target.value)}
          name="map-switch"
          id={`left${this.props.mid}`}
          type="radio"
          className="radioTrippleSwitch"
          value="left"
        />
        <label
          className={`left-label  ${this.state.switchPosition === "left" && "black-font"
            }`}
          htmlFor={`left${this.props.mid}`}
          style={{
            padding: "5px 8px 5px 8px",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {labels.left.title}
        </label>

        <input
          onChange={(e) => this.getSwitchAnimation(e.target.value)}
          name="map-switch"
          id={`right${this.props.mid}`}
          type="radio"
          className="radioTrippleSwitch"
          value="right"
        />
        <label
          className={`right-label  ${this.state.switchPosition === "right" && "black-font"
            }`}
          style={{
            padding: "5px 8px 5px 8px",
            fontSize: "13px",
            fontWeight: 500,
          }}
          htmlFor={`right${this.props.mid}`}
        >
          {labels.right.title}
        </label>
      </div>
    );
  }
}

TripleToggleSwitch.propTypes = propTypes;
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
