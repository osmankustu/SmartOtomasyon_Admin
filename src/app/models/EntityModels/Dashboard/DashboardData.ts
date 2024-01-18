import { VisitorModel } from "../Visitors/VisitorModel"

export interface DashboardData{
    count:number
    lastLogin:VisitorModel[]
    lastVisit:VisitorModel[]
    yearlVisit:YearlyDto[]
}

export interface YearlyDto{
    ay:string
    count:number
}

