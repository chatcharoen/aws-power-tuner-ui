import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TunerPayload } from '../models/tuner-payload';
import { PowerTunerToken } from '../models/power-tuner-token';
import { PowerTunerInformation } from '../models/power-tuner-information';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  performPowerTunerStepFunction(application: TunerPayload): Observable<PowerTunerToken> {
    return this.httpClient.post<PowerTunerToken>(`${environment.apiGatewayBaseUrl}/power-tuner`, application);
  }

  fetchPowerTunerStepFunction(powerTunerToken: PowerTunerToken): Observable<PowerTunerInformation> {
    return this.httpClient.post<PowerTunerInformation>(`${environment.apiGatewayBaseUrl}/power-tuner/result`, powerTunerToken)
      .pipe(
        retry(0), // retry a failed request up to 0 times
      );
  }
}
