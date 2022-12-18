using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnettemplate.Migrations
{
    /// <inheritdoc />
    public partial class TypoPhone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumer",
                table: "Orders",
                newName: "PhoneNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                table: "Orders",
                newName: "PhoneNumer");
        }
    }
}
