import {logo} from './pdfLogoBase64';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Logo
const headerLogo = {image: 'logo', width: 115, height: 62};

// PDF Styles
const margin = [0, 8, 0 , 8];
const defaultStyle = {fontSize:9, font: 'Roboto'};
const headerTitleStyle = {fontSize: 12, alignment: 'right', margin: [0, 24, 0, 0]};
const titleStyle = {fontSize: 14, bold: true, decoration: 'underline', alignment: 'center', margin: [0, 8, 0 , 2]};
const subtitleStyle = {fontSize: 9, alignment: 'center', margin: [0, 2, 0 , 8]};
const tableStyle = {fontSize: 9, margin};
const tableTitleStyle = {fontSize: 11, bold: true, margin};
const versionStyle = {fontSize: 9, alignment: 'right', margin: [0,8,0,4]};

const styles = {
    header: headerTitleStyle,
    title: titleStyle,
    subtitle: subtitleStyle,
    tableTitle: tableTitleStyle,
    table: tableStyle,
    version: versionStyle
};

// Header
const headerTitle = {text: 'MY TEST REPORT', style: 'header'};
const headerVersion = (currentPage, pageCount) => ({text: `${new Date().toLocaleDateString()}   -   Page ${currentPage} of ${pageCount}`, style: ['version'] });
const headerColumns = (currentPage, pageCount) => ({margin:[20, 8, 20, 0], columns: [headerLogo,[headerTitle, headerVersion(currentPage, pageCount)]]});
const headerRule = ()=> {return {canvas: [{ type: 'line', x1: 0, y1: 5, x2: 555, y2: 5, lineWidth: .5, color: '#656565' }], margin: [16, 0, 0, 0]};};// wrapped in a arrow function to avoid a bug that only shows the rule on page 1
const header = (currentPage, pageCount) => ([headerColumns(currentPage, pageCount), headerRule()]);

// Page 1
const title = {text:'My Title', style:'tableTitle'};

module.exports.downloadStudentSchedules = (students, filename) => {

    // var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };

    const student = students[0];

    const docDefinition = makePdfDefinition(student);
    pdfMake.createPdf(docDefinition).download(filename);
};

const makeTitle = (student) => {
    return {
        text: `Student Schedule for ${student.firstName} ${student.lastName}`,
        style: 'tableTitle'
    };
};

const makeStudentSummary = (student) => {
    const unit = student.profileType === 'Scout' ? `Troop ${student.unit}` : `Crew ${student.unit}`;
    const profileInfo = `${student.profileType} / ${student.level}`;
    const leader = `Leader:  ${student.leaderFirstName} ${student.leaderLastName}`;
    return {
        columns: [
            { width: 'auto', text: unit },
            { width: 'auto', text: profileInfo },
            { width: 'auto', text: leader }
        ],
        columnGap: 10,
        margin: [0, 0, 0, 20],
    };
};

const makePdfDefinition = (student) => {
    const definition = {
        pageMargins: [ 40, 94, 40, 15 ], // left, right, top, bottom
        // header: header,
        content: [makeTitle(student), makeStudentSummary(student), makeCourseTable(student.courses)],
        images: {logo},
        styles: styles,
        defaultStyle: defaultStyle
    };

    return definition;
};

const makeCourseTable = (courses) => {

    const columnHeaders = [
        {text: 'Period', style: 'tableHeader'},
        {text: 'Location', style: 'tableHeader'},
        {text: 'Class Name', style: 'tableHeader'},
        {text: 'Class #', style: 'tableHeader'},
        {text: 'Pre-requisites', style: 'tableHeader'},
        {text: 'Counselor', style: 'tableHeader'},
        {text: 'Notes', style: 'tableHeader'},
    ];

    const rows = courses.map(c => {
        return [
            {text: c.period},
            {text: c.classroom},
            {text: c.courseName},
            {text: 'TBD'},
            {text: 'TBD'},
            {text: c.counselor},
            {text: c.notes},
        ];
    });

    return {
        style: 'tableExample',
        table: {
            widths: ['10%', '10%', '15%', '10%', '15%', '10%', '30%'],
            headerRows: 1,
            body: [
                columnHeaders,
                ...rows
            ],
        },
        layout: 'lightHorizontalLines'
    };
};