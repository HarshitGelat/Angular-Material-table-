import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns = [
    'checked',
    'name',
    'progress',
    'color',
    'file',
    'download'
  ];
  dataSource: MatTableDataSource<UserData>;
  users: UserData[] = [];
  checkAllRow: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    this.users = [];
    for (let i = 1; i <= 100; i++) {
      this.users.push(createNewUser(i));
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit() {}

  onSelectionChageForAll(): void {

    this.users.forEach(item => {
      item.checked = this.checkAllRow;
    });

    this.dataSource = new MatTableDataSource(this.users);
  }

  onSelectionChageForRow(): void {
    this.checkAllRow = false;
  }

  onFileChange(event, index) {
    const files = event.target.files;
    console.log(files);
    this.users[index].file = files[0];
    this.dataSource = new MatTableDataSource(this.users);
  }

  removeFile(index) {
    this.users[index].file = null;
    this.dataSource = new MatTableDataSource(this.users);
  }

  clickDownload(index): void {
    if(this.users[index].file === null || this.users[index].file === undefined) {
      return;
    }

    let file = this.users[index].file;
    let fr = new FileReader();
    fr.readAsDataURL(file);

    var blob = new Blob([file], { type: 'application/pdf' });

    var objectURL = window.URL.createObjectURL(blob);
    

    if (navigator.appVersion.toString().indexOf('.NET') > 0) {
      window.navigator.msSaveOrOpenBlob(blob, file.name);
    } else {
      var link = document.createElement('a');
      link.href = objectURL;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    checked: false,
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    file: null,
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}

/** Constants used to fill up our data base. */
const COLORS = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];

const NAMES = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

export interface UserData {
  checked: boolean;
  name: string;
  progress: string;
  color: string;
  file: File;
}


