#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define mod(a, b) (((a) % (b) + (b)) % (b))

int inverse_26(int a){
    for (int i=0;i<26;i++){
        if (mod((a*i),26)==1)return i;
    }
    return -1;
}

char* caesar_EN(char* x, int k){
    int len=strlen(x);
    char *result=(char*)malloc(len+1);
    for (int i=0;i<len;i++){
        if ('a'<=x[i]&&x[i]<='z'){
            result[i]='a'+(mod(x[i]-'a'+k,26));
        }
        else{
            result[i]=x[i];
        }
    }
    result[len] = '\0';
    return result;
}

char* caesar_DE(char* y, int k){
    int len=strlen(y);
    char *result=(char*)malloc(len+1);
    for (int i=0;i<len;i++){
        if ('a'<=y[i]&&y[i]<='z'){
            result[i]='a'+(mod(y[i]-'a'-k,26));
        }
        else{
            result[i]=y[i];
        }
    }
    result[len] = '\0';
    return result;
}

char* affine_EN(char* x, int k1, int k2){
    int len=strlen(x);
    char *result=(char*)malloc(len+1);
    for (int i=0;i<len;i++){
        if ('a'<=x[i]&&x[i]<='z'){
            result[i]='a'+(mod((x[i]-'a')*k1+k2,26));
        }
        else{
            result[i]=x[i];
        }
    }
    
    result[len] = '\0';
    return result;
}

char* affine_DE(char* y, int k1, int k2){
    int len=strlen(y);
    char *result=(char*)malloc(len+1);
    int r=inverse_26(k1);
    if (r==-1){
        strcpy(result,"-1");
        return result;
    }

    for (int i=0;i<len;i++){
        if ('a'<=y[i]&&y[i]<='z'){
            result[i]='a'+(mod((y[i]-'a'-k2)*r,26));
        }
        else{
            result[i]=y[i];
        }
    }
    
    result[len] = '\0';
    return result;
}

int main(void){
    int k;
    char str[101];
    printf("Input String (max length 100): ");
    fgets(str,sizeof(str),stdin);
    str[strcspn(str, "\n")] = '\0';

    printf("*** Caesar Test ***\n");
    printf("Input Caesar Key (k): ");
    scanf("%d",&k);

    char* caesar_edata=caesar_EN(str,k);
    printf("Encrypted: %s\n", caesar_edata);
    char* caesar_ddata=caesar_DE(caesar_edata,k);
    printf("Decrypted: %s\n", caesar_ddata);
    free(caesar_edata);
    free(caesar_ddata);

    printf("\n*** Affine Test ***\n");
    int k1,k2;
    printf("Input Affine key (k1): ");
    scanf("%d",&k1);
    printf("Input Affine key (k2): ");
    scanf("%d",&k2);
    char* c=affine_EN(str,k1,k2);
    printf("Encrypted: %s\n",c);
    char* p=affine_DE(c,k1,k2);
    if (strcmp(p,"-1")==0){ printf("k1's inverse not exist. thus, not decrypted.\nDecrypted: -1"); }
    else{ printf("Decrypted: %s\n",p); }
    free(c);
    free(p);
    
}