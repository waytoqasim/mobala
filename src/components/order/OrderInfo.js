import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const OrderInfo = (props) => {
    // debugger;
    const { currency, amount, currencyInfo, city, country, AdditionalInfo, 
        giveAssistance, sourceBank, sourceCash, cashImage, bankImage, assistance, 
        state } = props;
    return (
        <div >
            <div style={{ display: 'flex' }}>
                <h6 className="txt_order" style={{ margin: '0px' }}>
                    <OverlayTrigger
                        overlay={<Tooltip style={{ position: "absolute" }} id="tooltip-disabled" bsPrefix="custom-tooltip">{currencyInfo}</Tooltip>}
                        placement="top-start"
                    >
                        <div className='d-flex'>
                            <p>{currency} {amount.toLocaleString()}

                            </p>
                            <div style={{ position: "relative" }}>
                                {sourceCash ? (
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip
                                                id="tooltip-disabled"
                                                bsPrefix="custom-tooltip"
                                                style={{ position: "absolute" }}
                                            >
                                                Cash 
                                            </Tooltip>
                                        }
                                        placement="top-start"
                                    >
                                        <img className="cashicon" src={cashImage}></img>
                                    </OverlayTrigger>
                                ) : null}
                                {sourceBank ? (
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip
                                                id="tooltip-disabled"
                                                bsPrefix="custom-tooltip"
                                                style={{ position: "absolute" }}
                                            >
                                                Bank 
                                            </Tooltip>
                                        }
                                        placement="top-start"
                                    >
                                        <img className="bankicon" src={bankImage}></img>
                                    </OverlayTrigger>
                                ) : null}

                                {!sourceCash && !sourceBank ? (
                                    <div style={{ position: "relative" }}>
                                        {" "}
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip
                                                    id="tooltip-disabled"
                                                    bsPrefix="custom-tooltip"
                                                    style={{ position: "absolute" }}
                                                >
                                                    Cash 
                                                </Tooltip>
                                            }
                                            placement="top-start"
                                        >
                                            <img alt='' className="cashicon" src={cashImage}></img>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            overlay={
                                                <Tooltip
                                                    id="tooltip-disabled"
                                                    bsPrefix="custom-tooltip"
                                                    style={{ position: "absolute" }}
                                                >
                                                    Bank 
                                                </Tooltip>
                                            }
                                            placement="top-start"
                                        >
                                            <img className="bankicon" src={bankImage}></img>
                                        </OverlayTrigger>
                                    </div>
                                ) : null}
                            </div>

                            <div style={{ position: "relative" }}>
                                {giveAssistance ? (
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip
                                                id="tooltip-disabled"
                                                bsPrefix="custom-tooltip"
                                                style={{ position: "absolute" }}
                                            >
                                                Open to Settlement from a Money Changer
                                            </Tooltip>
                                        }
                                        placement="top-start"
                                    >
                                        <img alt='' className="cashicon" src={assistance}></img>
                                    </OverlayTrigger>
                                ) : null}
                            </div>
                        </div>
                    </OverlayTrigger>
                </h6>
            </div>
            <h6 className="txt_order" style={{ position: 'relative' }}>
                <OverlayTrigger
                    overlay={<Tooltip style={{ position: 'absolute' }} id="tooltip-disabled" bsPrefix="custom-tooltip">{`${city}, ${state} ${country}`}</Tooltip>}
                    placement="top-start"
                >
                    <p>{`${city}, ${country}`}</p>
                </OverlayTrigger>
            </h6>

        </div>
    );
}

export default OrderInfo;
