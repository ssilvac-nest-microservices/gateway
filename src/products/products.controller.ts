import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_CLIENT } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_CLIENT) private readonly client: ClientProxy) {}

  @Get()
  getAllProducts(@Query() paginationDto: PaginationDto): Observable<any> {
    return this.client.send({ cmd: 'findAll' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Observable<any>> {
    return this.client.send({ cmd: 'findOne' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );

    // try {
    //   const product = await firstValueFrom(
    //     this.client.send({ cmd: 'findOne' }, { id }),
    //   );
    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto): Observable<any> {
    return this.client.send({ cmd: 'create' }, createProductDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update' }, { id, ...updateProductDto })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'remove' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
