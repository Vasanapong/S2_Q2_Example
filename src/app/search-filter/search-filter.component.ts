import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  preload = false
  allCategory:any
  allResult:any
  searchResult:Array<any> = []

  selectedCategory = 'Animals'

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchCategoryOne();
    this.fetchResultOne();

    const myInterval = setInterval(()=>{
      if(this.allCategory && this.allResult){
      this.showResultOne()
      this.preload = true
      clearInterval(myInterval)
      }
    },1000)
  }

  fetchCategoryOne(){
    this.http.get('https://api.publicapis.org/categories')
    .subscribe((res)=>{
      this.allCategory = res;
      this.allCategory = this.allCategory.categories
    })
  }

  fetchResultOne(){
    this.http.get('https://api.publicapis.org/entries')
    .subscribe((res)=>{
      this.allResult = res;
      this.allResult = this.allResult.entries
    })
  }

  showResultOne(){
    let result = this.allResult.filter((item:any)=>{
      return item.Category === 'Animals'
    })
    this.searchResult = result
  }

  // After Init
  showResultUpdate(){
    // console.log(this.selectedCategory)
    let result = this.allResult.filter((item:any)=>{
      return item.Category === this.selectedCategory
    })
    this.searchResult = result
  }

  changeCategory(e:any){
    this.selectedCategory = e.target.value;
    this.showResultUpdate()
  }

  changeSearchText(e:any){
    let preResult = this.allResult.filter((item:any)=>{
      return item.Category === this.selectedCategory
    })
    let result = preResult.filter((item: any)=>{
      return item.API.toLowerCase().includes(e.target.value.toLowerCase())
    })
    this.searchResult = result
  }

}