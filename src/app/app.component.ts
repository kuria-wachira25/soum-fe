import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

type Response = {
  status: string;
  content: {
    _id: string;
    name: string;
    size: number;
    md5: string;
    mimetype: string;
    s3Ref: string;
    filePath: string;
    uploadedAt: string;
    extension: string;
    url: string;
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  imageUrl: string | null = null;
  imageName: string | null = null;
  loading: boolean = false;
  errorMessage: Error | null = null;
  environment: any;

  constructor(private httpClient: HttpClient) {
    this.environment = environment;
    this.getImage();
  }

  public async getImage() {
    this.httpClient.get(`${environment.apiEndpoint}/image`).subscribe(
      (response) => {
        const {
          content: { url, name },
        } = response as Response;
        this.imageUrl = url;
        this.imageName = name;
      },
      (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
