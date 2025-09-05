import os
import shutil
import zipfile

def uncomment_lms_commands(js_folder):
    modified_files = 0
    total_blocks = 0

    for root, dirs, files in os.walk(js_folder):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    lines = f.readlines()

                new_lines = []
                uncomment = False
                block_modified = False

                for line in lines:
                    if "//Command for LMS platform" in line:
                        uncomment = True
                        new_lines.append(line)
                        continue

                    if uncomment:
                        stripped = line.lstrip()
                        if stripped.startswith("//"):
                            # rimuove solo i // iniziali
                            new_lines.append(line.replace("//", "", 1))
                            block_modified = True
                        else:
                            # qualsiasi riga non commentata → fine blocco
                            uncomment = False
                            new_lines.append(line)
                    else:
                        new_lines.append(line)

                if block_modified or any(l != n for l, n in zip(lines, new_lines)):
                    modified_files += 1
                    total_blocks += block_modified
                    with open(file_path, "w", encoding="utf-8") as f:
                        f.writelines(new_lines)

    print(f"✅ LMS commands sbloccati in {modified_files} file JS, totale blocchi modificati: {total_blocks}")


def create_package():
    source_dir = os.getcwd()  # cartella corrente
    dest_dir = os.path.join(source_dir, "Hello-World-LO")

    # se la cartella esiste già, la cancello per ricrearla pulita
    if os.path.exists(dest_dir):
        shutil.rmtree(dest_dir)

    # funzione di filtro per ignorare .git e README.md
    def ignore_func(dir, files):
        ignored = []
        for item in [".git", "README.md", "packager.py", "Hello-World-LO.zip"]:
            if item in files:
                ignored.append(item)
        return ignored

    # copia la cartella corrente in Hello-World-LO (ignorando .git e README.md)
    shutil.copytree(source_dir, dest_dir, ignore=ignore_func)

    # sblocca i comandi LMS nei file JS
    uncomment_lms_commands(dest_dir)

    # crea lo zip
    zip_filename = os.path.join(source_dir, "Hello-World-LO.zip")
    if os.path.exists(zip_filename):
        os.remove(zip_filename)

    with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dest_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, source_dir)
                zipf.write(file_path, arcname)

    print(f"✅ Creato: {zip_filename}")

    # elimina cartella temporanea
    if os.path.exists(dest_dir) and os.path.isdir(dest_dir):
        shutil.rmtree(dest_dir)
        print(f"✅ Cartella '{dest_dir}' eliminata con tutto il contenuto")

if __name__ == "__main__":
    create_package()

