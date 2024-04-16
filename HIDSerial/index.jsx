import React, { useEffect, useState } from 'react';

const vendorIdLfTouchV1 = 0x2405
const productIdLfTouchV1 = 0xA;

const vendorIdLfTouchV2 = 0x2405
const productIdLfTouchV2 = 0xAA;


const vendorIdSmartPlus = 0x2405
const productIdSmartPlus = 0xB;

const filters = [
    {
        vendorId: vendorIdLfTouchV1,
        productId: productIdLfTouchV1,
        usagePage: 0xFF00,
        usage: 0x01,
    },
    {
        vendorId: vendorIdLfTouchV2,
        productId: productIdLfTouchV2,
        usagePage: 0xFF00,
        usage: 0x01,
    },
    {
        vendorId: vendorIdSmartPlus,
        productId: productIdSmartPlus,
        usagePage: 0xFF00,
        usage: 0x01,
    },
]


const HIDSerial = () => {
    const [hidDevices, setHidDevices] = useState('');
    const [serialPorts, setSerialPorts] = useState('');
    let device = ''
    useEffect(() => {
        console.log(`devices ${hidDevices}`)
        console.log(`devices ${serialPorts}`)

    }, [hidDevices, serialPorts])

    async function conectarDispositivos() {
        // Verifica se o navegador suporta a API HID
        if ('hid' in navigator) {
            const devices = await navigator.hid.requestDevice({ filters: filters });
            device = devices[0];
            console.log(device)
            setHidDevices(device?.productId)
        }

        // Verifica se o navegador suporta a API Serial
        if (('serial' in navigator) && (!device)) {
            const port = await navigator.serial.requestPort()
            device = port;
            console.log(device)
            console.log(device?.getInfo())
            //setSerialPorts(device?.getInfo())
        }
    } 
    return (
        <div>
            <button onClick={conectarDispositivos}>Conectar</button>
            <h2>Dispositivos Conectado: {hidDevices} </h2>
            <h2>Dispositivos Conectado: {serialPorts} </h2>
        </div>
    );
};

export default HIDSerial;   