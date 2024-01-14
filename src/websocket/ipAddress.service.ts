import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class IpAddressService {
  constructor(private config: ConfigService) {}
  private ipAddress: string;

  setIpAddress(ipAddress: string) {
    this.ipAddress = ipAddress;
  }

  getIpAddress() {
    return this.getIpAddressLocation('127.0.0.1');
  }

  async getIpAddressLocation(ipAddress: string) {
    const IPSTACK_KEY = this.config.get<string>('IPSTACK_KEY');
    const res = await fetch(
      `http://api.ipstack.com/${ipAddress}?access_key=${IPSTACK_KEY}`,
    );
    const data = await res.json();
    return data;
  }
}
