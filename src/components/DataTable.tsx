import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type CsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
};

interface DataTableProps {
  data: CsvData;
}

export default function DataTable({ data }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Step 2: Preview Your Data</CardTitle>
        <CardDescription>
          Here&apos;s a preview of your CSV data. Use the sidebar to select the columns you want to include in the QR codes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <Table>
            <TableHeader>
              <TableRow>
                {data.headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.length > 0 ? (
                data.rows.map((row, i) => (
                  <TableRow key={i}>
                    {data.headers.map((header) => (
                      <TableCell key={header}>{row[header]}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={data.headers.length} className="h-24 text-center">
                    No data to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
