import SlotMachineGen from "slot-machine-gen";
import React from "react";
import "slot-machine-gen/dist/slot-machine.min.css";

class SlotMachine extends React.Component {
  componentDidMount() {
    this.refs.wrapper.innerHTML = "";
    this.slot = new SlotMachineGen(this.refs.wrapper, this.props.reels, this.props.callback, this.props.options);
  }

  componentDidUpdate(prevProps) {
    if (this.props.play !== prevProps.play) {
      this.slot.play();
    }
  }

  render() {
    return <div id={this.props.id} className="slot-machine" ref="wrapper"></div>;
  }
}

export default SlotMachine;
